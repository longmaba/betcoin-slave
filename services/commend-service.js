import mongoose from 'mongoose';
import Bois from '../models/Bois';
import bluebird from 'bluebird';

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = bluebird;

let CommendService = {};

CommendService.addCommend = async (receiver, sender) => {
  await CommendService.checkIfExistAndCreateUser(receiver);
  await CommendService.checkIfExistAndCreateUser(sender);
  await Bois.update(
    {
      name: receiver
    },
    {
      $inc: {
        commended: 1
      }
    }
  );
  let user = await Bois.findOne({
    name: receiver,
    'commendedBy.name': sender
  });
  let user1 = await Bois.findOne({
    name: receiver
  });
  if (!user) {
    await Bois.update(
      {
        name: receiver
      },
      {
        commendedBy: [
          ...user1.commendedBy,
          {
            name: sender,
            count: 1
          }
        ]
      }
    );
  } else {
    await Bois.update(
      {
        name: receiver,
        'commendedBy.name': sender
      },
      {
        $inc: {
          'commendedBy.$.count': 1
        }
      }
    );
  }
};

CommendService.checkIfExistAndCreateUser = async username => {
  let boi = await Bois.findOne({
    name: username
  });
  if (!boi) {
    boi = await Bois.create({
      name: username
    });
  }
  return await boi;
};

CommendService.viewCommended = async username => {
  let user = await CommendService.checkIfExistAndCreateUser(username);
  return user.commended;
};

export default CommendService;
