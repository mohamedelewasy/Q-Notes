import { uuid } from 'uuidv4';

import DocModel from '../src/models/doc.model';

(async () => {
  for (let i = 0; i < 50; i++) {
    const id = uuid();
    const educationLevel = ['prep', 'secondary', 'primary', 'kindergarten'][
      Math.floor(Math.random() * 4)
    ];
    await DocModel.create({
      id,
      pdf: `${id}.pdf`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero harum eaque natus aliquam laudantium, ea velit minima ipsa obcaecati quos nihil expedita ullam saepe quia, eius, reprehenderit sunt ipsum ut cupiditate voluptates laboriosam. Eos vel repellendus quos hic cum quae incidunt autem omnis saepe dignissimos quam eum, inventore odio architecto accusantium quia magni quasi dolore! Corrupti, dolores quaerat repellendus aspernatur quidem adipisci ratione dignissimos dolore cum, totam iste! Quo in architecto, magni atque ipsum perferendis explicabo nobis libero molestiae odio.',
      educationLevel,
      className: Math.floor(1 + Math.random() * 6),
      semester: ['one', 'two'][Math.floor(Math.random() * 2)],
      title: `title of ${educationLevel} school num-${i}`,
      price: 1 + Math.random() * 100,
    });
    console.log(`${Math.round((i * 100) / 50)}%`);
  }
  console.log('100%');
})();
