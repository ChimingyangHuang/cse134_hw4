/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });
		
		element = document.getElementById('advancedWalkBtn');
    element.addEventListener('click', function () {
        advancedWalk();
    });
		
		element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });
		
		element = document.getElementById('advancedAddBtn');
    element.addEventListener('click', function () {
        advancedAdd();
    });
		
		element = document.getElementById('safeRemoveBtn');
    element.addEventListener('click', function () {
        safeRemove();
    });
		
		element = document.getElementById('removeBySelectorBtn');
    element.addEventListener('click', function () {
        removeBySelector();
    });
		
		element = document.getElementById('basicCloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });
		
		element = document.getElementById('advancedCloneBtn');
    element.addEventListener('click', function () {
        advancedClone();
    });
}

function advancedWalk() {
		let q1b = document.getElementById('q1b');
		q1b.innerHTML=""
    let root = document.documentElement;
    printNodeIndent(root, 0);
}

function printNodeIndent(node, indentLevel) {
		if (node.nodeType === 3 && node.nodeValue.trim() === '') {
        return;
    }

    if (node.nodeType === 8) {
        return;
    }
	
	
    let q1b = document.getElementById('q1b');
    let nodeName = node.nodeName;
    q1b.innerHTML += ' '.repeat(indentLevel * 4) + nodeName + '\n';

    for (let i = 0; i < node.childNodes.length; i++) {
        printNodeIndent(node.childNodes[i], indentLevel + 1);
    }
}




function printNode(node) {
    let q1a = document.getElementById('q1a');
    let nodeType = node.nodeType;
    let nodeName = node.nodeName;
    let nodeValue = node.nodeValue;
		
    q1a.innerHTML += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`
}



function walk() {
		let q1a = document.getElementById('q1a');
		q1a.innerHTML=''
    let el;

    el = document.getElementById('p1');
    printNode(el);

    el = el.firstChild;
    printNode(el);

    el = el.nextSibling;
    printNode(el);

    el = el.lastChild;
    printNode(el);

    el = el.parentNode.parentNode.parentNode;
    printNode(el);

    el = el.querySelector('section > *');
    printNode(el);
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}
function advancedModify() {
    let elList = document.getElementsByTagName("h1");
		for (let i = 0; i < elList.length; i++) {
        elList[i].innerHTML="DOM Manipulation is Fun!"
				let num = Math.floor(Math.random() * 6) + 1;
				elList[i].style.color = getComputedStyle(document.documentElement).getPropertyValue(`--darkcolor${num}`);
    }
		
		let pelList = document.getElementsByTagName("p");
		for (let i = 0; i < pelList.length; i++) {
			if (pelList[i].classList.contains('shmancy')) {
            pelList[i].classList.remove('shmancy');
        } else {
            pelList[i].classList.add('shmancy');
        }
    }
		// inspiration from here:https://www.w3schools.com/css/tryit.asp?filename=trycss3_writing-mode
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}
function advancedAdd() {
    let elementType = document.getElementById('elementType').value
    let elementContent = document.getElementById("elementContent").value;


    let newElement;
		
		
		switch (elementType) {
				case "textNode":
						if (elementContent==""){
							newElement = document.createTextNode(`New Text Node - ${new Date().toLocaleString()} `);
						}
						else{
							newElement = document.createTextNode(`${elementContent} - ${new Date().toLocaleString()} `);
						}
						break;
				case "commentNode":
						if (elementContent==""){
							newElement = document.createComment(`New Comment Node - ${new Date().toLocaleString()} `);
						}else{
							newElement = document.createComment(`${elementContent} - ${new Date().toLocaleString()} `);
						}
						break;
				case "elementNode":
						if (elementContent==""){
							newElement = document.createElement("p");
							newElement.innerHTML = `New Element Node - ${new Date().toLocaleString()} `;
						}else{
							newElement = document.createElement("p");
							newElement.innerHTML = `${elementContent} - ${new Date().toLocaleString()} `;
						}
						break;
		}
    let output = document.getElementById("output");
    output.appendChild(newElement);

    output.style.border = "1px solid black";
    output.style.backgroundColor = "pink";
		output.style.display = "inline-block"; // Set the display property to inline-block
}

function safeRemove() {
    let body = document.body;

    // Loop through the elements from the bottom up
    for (let i = body.children.length - 1; i >= 0; i--) {
			  let element = body.children[i];

        if (!element.matches("section") && !element.matches("script")) {
          body.removeChild(element);
        }
    }
}

function removeBySelector() {
		
		let removedCSS = document.getElementById("removedSelector").value;
		console.log(removedCSS)
		let elements = document.querySelectorAll(removedCSS);
		elements.forEach((element) => element.remove());

}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function basicClone(){
	let toCloneList=document.getElementsByTagName('p')
	let paragraphsArray = Array.from(toCloneList);
	let toAppend=document.getElementById("output")
	for (let i = 0; i < paragraphsArray.length; i++) {
    let clonedElement = paragraphsArray[i].cloneNode(true);
    if (clonedElement.hasAttribute("id")) {
      clonedElement.removeAttribute("id");
    }
		toAppend.appendChild(clonedElement);
	}
}

function advancedClone() {
  let temp = document.getElementsByTagName("template")[0];
  let clon = temp.content.cloneNode(true);
	let randomNumber = Math.floor(Math.random() * 10) + 1;
	clon.getElementById("randomNumber").innerHTML=randomNumber
  document.body.appendChild(clon);
}

window.addEventListener('DOMContentLoaded', init);