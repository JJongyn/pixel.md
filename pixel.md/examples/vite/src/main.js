import './style.css';
import 'pixel.md/chat-effect';
import 'pixel.md/indicator';

const composer = document.querySelector('#composer');
const prompt = document.querySelector('#prompt');
const messages = document.querySelector('#messages');
const statusSlot = document.querySelector('#status-slot');
let responseTimer;

composer.addEventListener('submit', event => {
  event.preventDefault();
  const message = prompt.value.trim();
  if (!message) return;

  clearTimeout(responseTimer);
  messages.replaceChildren();
  const userMessage = document.createElement('p');
  userMessage.className = 'user-message';
  userMessage.textContent = message;
  messages.append(userMessage);
  prompt.value = '';

  const status = document.createElement('pixel-agent-status');
  status.setAttribute('state', 'thinking');
  status.setAttribute('label', 'Thinking…');
  status.setAttribute('detail', 'Reading your message');
  statusSlot.replaceChildren(status);

  responseTimer = setTimeout(() => {
    status.setAttribute('state', 'responding');
    status.setAttribute('label', 'Responding…');
    status.setAttribute('detail', 'Ready for your model output');
  }, 1100);
});
