import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Awaliyatul Hikmah',
    email: 'dev@mst.id',
    password: 'Pass1234!',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+62 81234567890',
    country: 'Indonesia',
    address: '009003 Aloka',
    state: 'Jawa Tengah',
    city: 'Pati',
    zipCode: '59158',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
