import { createClient } from 'redis';

const client = createClient({
  username: 'default',
  password: 'Jx6PHkrNuEsi3spQI0fZPEezCcoJICtO',
  socket: {
    host: 'redis-15190.c261.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 15190,
  },
});

(async () => {
  try {
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    console.log('Connected successfully to Redis');
    // await client.set('foo', 'bar');
    // const result = await client.get('foo');
    // console.log(result); // >>> bar
  } catch (error) {
    console.log('Redis Client Error', error);
  }
})();

export default client;
