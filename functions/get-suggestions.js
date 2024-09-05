const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const response = await fetch(`https://api.netlify.com/api/v1/forms/66d91c49e0016b0008da22de/submissions`, {
      headers: {
        Authorization: `Bearer ${process.env.NETLIFY_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Erro ao buscar sugestões' }),
      };
    }

    const submissions = await response.json();
    const sugestoes = submissions.map(submission => ({
      nome: submission.data.nome,
      sugestao: submission.data.sugestao,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(sugestoes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro no servidor' }),
    };
  }
};
