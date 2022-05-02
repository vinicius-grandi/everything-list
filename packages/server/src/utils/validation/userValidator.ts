import Validator from 'validatorjs';

type UserInfo = {
  username?: string;
  password: string;
  email: string;
};

function userValidator(user: UserInfo): boolean | void {
  const validation = new Validator(user, {
    email: 'required|email',
    username: 'max:15',
    password: [
      'required',
      'regex:/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$%&*()+_-].*[!@#$%&*()+_-])(?=.*[\\d].*[\\d])(?=.*[a-z].*[a-z]).{8,15}$/',
    ],
  });

  return validation.passes();
}

export default userValidator;
