export async function streamChat(key, messages, onText) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + key},
        body: JSON.stringify({model: 'openai/gpt-oss-120b', messages, stream: true,
            reasoning_effort: 'low', max_completion_tokens: 2048})
    });
    if (!response.ok) {
        const error = new Error(response.status === 429
            ? 'Groq rate limit reached. Wait a moment or try a shorter prompt.'
            : 'Groq request failed (HTTP ' + response.status + '). Check your key and model access.');
        error.status = response.status;
        throw error;
    }
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = '', text = '';
    try {
        while (true) {
            const {done, value} = await reader.read();
            buffer += (value || '') + (done ? '\n' : '');
            let end;
            while ((end = buffer.indexOf('\n')) !== -1) {
                const line = buffer.slice(0, end).trimEnd();
                buffer = buffer.slice(end + 1);
                if (!line.startsWith('data:')) continue;
                const data = line.slice(5).trim();
                if (data === '[DONE]') {
                    if (!text.trim()) throw new Error('Groq returned an empty answer. Please retry.');
                    return text;
                }
                const event = JSON.parse(data);
                if (event.error) throw new Error('Groq could not finish this response.');
                const delta = event.choices?.[0]?.delta?.content;
                if (delta) { text += delta; onText(text); }
            }
            if (done) throw new Error('The response was interrupted. Please try again.');
        }
    } finally { await reader.cancel(); }
}
