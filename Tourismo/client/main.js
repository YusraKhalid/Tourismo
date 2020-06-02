
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/routes.js';
import Account from '../imports/ui/Account.js';


Meteor.startup(() => {
  // render(<div>
  //   <Account />
  // </div>,
  // document.getElementById('signin')
  // );
  render(renderRoutes(), document.getElementById('render-target'));
});