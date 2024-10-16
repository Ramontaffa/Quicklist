const form = document.querySelector('form');
const itenInput = document.getElementById('input');
const ul = document.querySelector('ul');

const errorContainer = document.querySelector('.error.container');
const undoButton = errorContainer.querySelector('#undo-delete');
let removedItems = []; // Armazena todos os itens removidos

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = itenInput.value;

  if (inputValue.trim() === '') {
    alert('Preencha o campo');
  } else {
    const li = document.createElement('li');
    li.classList.add('list-itens');

    // adicionei o checkbox, o span e o botão de remoção
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const span = document.createElement('span');
    span.textContent = inputValue;

    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = './assets/trash.svg';
    img.alt = 'Button Icon';
    button.appendChild(img);

    // criei o evento de clique para cada botão de remoção (armazena a posição do item removido)
    button.addEventListener('click', () => {
      const index = Array.from(ul.children).indexOf(li); // Armazena o índice do item removido
      removedItems.push({ element: li, index }); // Adiciona o item e seu índice à lista de itens removidos
      ul.removeChild(li);
      showError();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    ul.prepend(li); // Adiciona o novo item na lista
    itenInput.value = ''; // Limpa o campo de entrada após adicionar
  }
});

// Mostra a mensagem de erro
function showError() {
  errorContainer.classList.add('visible'); // Adiciona a classe para mostrar a mensagem com transição
  errorContainer.style.transition = 'opacity .5s ease-in-out';
  errorContainer.style.opacity = '1'; 
  
  setTimeout(() => {
    errorContainer.style.opacity = '0';
  }, 4500);

  setTimeout(() => {
    errorContainer.classList.remove('visible');
  }, 5000);
}

// Adiciona o evento de clique ao botão de desfazer
undoButton.addEventListener('click', () => {
  if (removedItems.length > 0) {
    const { element, index } = removedItems.pop(); // Remove o último item da lista de removidos
    if (index >= 0 && index < ul.children.length) {
      ul.insertBefore(element, ul.children[index]); // Insere na posição original
    } else {
      ul.appendChild(element); // Se o índice não for válido, adiciona ao final (*mudar para quando adicionar mais itens e desfazer a remoção voltar para a posição correta*)
    }
    if (removedItems.length === 0) {
      errorContainer.classList.remove('visible'); // Remove a classe para ocultar a mensagem com transição
    }
  }
});
