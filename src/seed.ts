import { uuid } from 'uuidv4';

import DocModel from './models/doc.model';

(async () => {
  console.log('seed start');
  const semester = ['one', 'two'];
  // prep school
  for (let i = 0; i < 10; i++) {
    const id = uuid();
    await DocModel.create({
      id: id,
      pdf: id,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda praesentium facilis nam harum necessitatibus debitis unde veniam quis rem, voluptate, fugiat eos asperiores ipsam nemo corporis at. Corrupti, quis rem?',
      educationLevel: 'prep',
      className: Math.floor(1 + Math.random() * 6),
      semester: semester[Math.floor(Math.random() * 2)],
      title: 'title of prep rule-num-' + i,
      price: Math.random() * 100,
    });
  }
  // secondary school
  for (let i = 0; i < 10; i++) {
    const id = uuid();
    await DocModel.create({
      id: id,
      pdf: id,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda praesentium facilis nam harum necessitatibus debitis unde veniam quis rem, voluptate, fugiat eos asperiores ipsam nemo corporis at. Corrupti, quis rem?',
      educationLevel: 'secondary',
      className: Math.floor(1 + Math.random() * 6),
      semester: semester[Math.floor(Math.random() * 2)],
      title: 'title of secondary rule-num-' + i,
      price: Math.random() * 100,
    });
  }
  // primary school
  for (let i = 0; i < 10; i++) {
    const id = uuid();
    await DocModel.create({
      id: id,
      pdf: id,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda praesentium facilis nam harum necessitatibus debitis unde veniam quis rem, voluptate, fugiat eos asperiores ipsam nemo corporis at. Corrupti, quis rem?',
      educationLevel: 'primary',
      className: Math.floor(1 + Math.random() * 6),
      semester: semester[Math.floor(Math.random() * 2)],
      title: 'title of primary rule-num-' + i,
      price: Math.random() * 100,
    });
  }
  // kindergarten school
  for (let i = 0; i < 10; i++) {
    const id = uuid();
    await DocModel.create({
      id: id,
      pdf: id,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda praesentium facilis nam harum necessitatibus debitis unde veniam quis rem, voluptate, fugiat eos asperiores ipsam nemo corporis at. Corrupti, quis rem?',
      educationLevel: 'kindergarten',
      className: Math.floor(1 + Math.random() * 6),
      semester: semester[Math.floor(Math.random() * 2)],
      title: 'title of kindergarten rule-num-' + i,
      price: Math.random() * 100,
    });
  }
})();
