import ec2Client from 'aws-sdk/clients/ec2';
export const handler = async (event) => {
  const awsClient = new ec2Client({
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
  });
  awsClient;
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
  