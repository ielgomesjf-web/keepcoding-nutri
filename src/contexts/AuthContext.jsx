import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

const DEMO_USER = { uid: 'demo', email: 'demo@keepcoding.com' };
const DEMO_DATA = { id: 'demo', nome: 'Dr. Carlos Silva', email: 'demo@keepcoding.com', tipo: 'nutricionista', crn: 'CRN-3 12345' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo mode via URL param ?demo=nutri or ?demo=paciente
    const params = new URLSearchParams(window.location.search);
    const demo = params.get('demo');
    if (demo) {
      setUser(DEMO_USER);
      setUserData({ ...DEMO_DATA, tipo: demo === 'paciente' ? 'paciente' : 'nutricionista', nome: demo === 'paciente' ? 'Maria Silva' : 'Dr. Carlos Silva' });
      setLoading(false);
      return;
    }

    let unsub = () => {};
    const timeout = setTimeout(() => setLoading(false), 3000);
    try {
      unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        clearTimeout(timeout);
        setUser(firebaseUser);
        if (firebaseUser) {
          try {
            const snap = await getDoc(doc(db, 'usuarios', firebaseUser.uid));
            if (snap.exists()) {
              setUserData({ id: snap.id, ...snap.data() });
            }
          } catch {
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
        setLoading(false);
      });
    } catch {
      clearTimeout(timeout);
      setLoading(false);
    }
    return () => { unsub(); clearTimeout(timeout); };
  }, []);

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, 'usuarios', cred.user.uid));
    if (snap.exists()) {
      setUserData({ id: snap.id, ...snap.data() });
    }
    return cred;
  }

  async function register(email, password, data) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      nome: data.nome,
      email,
      tipo: data.tipo,
      crn: data.crn || '',
      telefone: data.telefone || '',
      foto: '',
      nutricionistaId: data.nutricionistaId || '',
      criadoEm: new Date().toISOString(),
    };
    await setDoc(doc(db, 'usuarios', cred.user.uid), userData);
    setUserData({ id: cred.user.uid, ...userData });
    return cred;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  }

  async function updateProfile(data) {
    if (!user) return;
    await updateDoc(doc(db, 'usuarios', user.uid), data);
    setUserData(prev => ({ ...prev, ...data }));
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
