import { Accounts } from 'meteor/accounts-base';

//authentication of user fields

const addCustomerFields = (options, user) => {
    console.log(options);
    const customizedUser = {
        age: 0
    };
    Object.assign(customizedUser, user);
    
      // We still want the default hook's 'profile' behavior.
      if (options.profile) {
        customizedUser.profile = options.profile;
      }
    
      return customizedUser;
};

Accounts.onCreateUser(addCustomerFields);