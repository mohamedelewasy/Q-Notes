const enum userRoutes {
  signin = 'signin',
  signup = 'signup',
  signout = 'signout',
  profile = 'profile',
  verify = 'verify',
}
const enum docRoutes {
  createDoc = 'createDoc',
  getDocList = 'getDocList',
  getDoc = 'getDoc',
  updateDoc = 'updateDoc',
  deleteDoc = 'deleteDoc',
}
export const userEndpoints: { [key in userRoutes]: { url: string; method: string } } = {
  [userRoutes.signin]: { url: '/api/v1/auth/signin', method: 'post' },
  [userRoutes.signup]: { url: '/api/v1/auth/signup', method: 'post' },
  [userRoutes.signout]: { url: '/api/v1/auth/signout', method: 'post' },
  [userRoutes.profile]: { url: '/api/v1/auth/profile', method: 'post' },
  [userRoutes.verify]: { url: '/api/v1/auth/verify/:code', method: 'get' },
};
export const docEndpoints: { [key in docRoutes]: { url: string; method: string } } = {
  [docRoutes.createDoc]: { url: '/api/v1/doc', method: 'post' },
  [docRoutes.getDocList]: { url: '/api/v1/doc', method: 'get' },
  [docRoutes.getDoc]: { url: '/api/v1/doc/:id', method: 'get' },
  [docRoutes.updateDoc]: { url: '/api/v1/doc/:id', method: 'patch' },
  [docRoutes.deleteDoc]: { url: '/api/v1/doc/:id', method: 'delete' },
};
