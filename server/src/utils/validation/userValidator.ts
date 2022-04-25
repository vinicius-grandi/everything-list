import Validator from 'validatorjs';

type UserInfo = {
  username?: 'string';
  password: 'string';
  email: 'string';
};

function userValidator(user: UserInfo) {
  if (user.username) {
    const validation = new Validator(user, {
      email: 'required|email',
      username: 'required|size:15',
      password: [
        'required',
        'regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/',
      ],
    });
  }
}

export default userValidator;
