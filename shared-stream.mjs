export async function streamChat(response, onText) {
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
