

        const form = document.querySelector('form');
        const ul = document.querySelector('ul');
        const input = document.getElementById('taskInpt');
        let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')):[];

        localStorage.setItem('items', JSON.stringify(itemsArray));
        const data = JSON.parse(localStorage.getItem('items'));

        /*
        let createDeleteBtn = function(){
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.className = 'deleteBtn';
            return deleteButton;
        }

        let createCompletedBtn = function(){
            var completedButton = document.createElement('button');
            completedButton.textContent = 'done';
            completedButton.className = 'completedBtn';
            return completedButton;
        }
        */

        let createBtn = (className, text) => {
            var deleteButton = document.createElement('button');
            deleteButton.textContent = text;
            deleteButton.className = className;
            return deleteButton;
        }




        const liMaker = text => {
            const li = document.createElement('li');
            li.textContent = text;
            li.className = text;
            li.appendChild(createBtn('deleteBtn', 'delete'));
            li.appendChild(createBtn('completedBtn', 'done'));
            ul.appendChild(li);
        }


        form.addEventListener('submit', function(event){
            event.preventDefault();

            itemsArray.push(input.value);
            localStorage.setItem('items', JSON.stringify(itemsArray));
            liMaker(input.value);
            input.value = '';
        });
        data.forEach(item => {
            liMaker(item);
        });

        function remove(el){
            let element = el;
            element.remove(el);
        }


        let setUpEventListener = () => {
            ul.addEventListener('click', function(event){
            const elementClicked = event.target;
            if(elementClicked.className === 'deleteBtn'){
                remove(elementClicked.parentNode);

                //remove from localstorage
                for(let i=0; i<itemsArray.length; i++){
                    if(elementClicked.parentNode.className === itemsArray[i]){
                        itemsArray.splice(i, 1);
                    }
                    localStorage.setItem('items', JSON.stringify(itemsArray));
                    }
                }

                
            if(elementClicked.className === 'completedBtn'){
                let compElem = document.getElementById('completed');
                let newCompElem = document.createElement('li');
                newCompElem.innerHTML = elementClicked.parentNode.className;
                compElem.appendChild(newCompElem);
                remove(elementClicked.parentNode);
                
                //remove from local storage
                for(let i=0; i<itemsArray.length; i++){
                    if(elementClicked.parentNode.className === itemsArray[i]){
                        itemsArray.splice(i, 1);
                    }
                    localStorage.setItem('items', JSON.stringify(itemsArray));
                }
                }
            })
        }


            setUpEventListener();
