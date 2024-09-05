const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const response = await fetch('https://api.netlify.com/api/v1/forms/YOUR_FORM_ID/submissions', {
    headers: {
      Authorization: `Bearer ${process.env.NETLIFY_API_TOKEN}`,
    },
  });

  const submissions = await response.json();
  const sugestoes = submissions.map(submission => ({
    nome: submission.data.nome,
    sugestao: submission.data.sugestao,
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(sugestoes),
  };
};
