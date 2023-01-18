// Node class with attributes for the data it stores as well as its left and right children.
class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}
// Build a Tree class / factory which accepts an array when initialized. 
// The Tree class should have a root attribute which uses the return value of 
// buildTree which you’ll write next.
class Tree {
    constructor() {
        this.root = null;
    }

    minimumValue() {
        if (this.root === null || this.root.left === null) {
            return this.root;
        };
        return this.root.left.minimumValue();
    }

    find(value) {
        if (this.root.value === value || this.root.value === null) {
            return this.root;
        }
        if (value < this.root.value) {
            return this.root.left.find(value);
        } else if (value > this.root.value) {
            return this.root.right.find(value);
        };
    }

    // accepts a value to insert into a balanced binary search tree
    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return this.root;
        } else if (value === this.root.value) {
            return this.root; //do I need this bit; is it right?
        } else if (value < this.root.value) {
            this.root.left.value = this.root.left.insert(value);
        } else {
            this.root.right.value = this.root.right.insert(value);
        };
    }

    // deletes a value in a balanced binary search tree
    // if it is a leaf, then delete it
    // if it has one child node, then copy child node to it and delete it
    // if it has two children nodes, then... find the next biggest number --> look in right tree, and then find the thing in right
    // tree on the far left copy it to the removed node and delete it
    delete(value) {
        if (this.root === null) {
            return this.root;
        }; 
        if (value < this.root.value) {
            this.root.left.delete(value);
        } else if (value > this.root.value) {
            this.root.right.delete(value);
        } else {
            if (this.root.left === null) {
                return this.root.right;
            } else if (this.root.right === null) {
                return this.root.left;
            } else { 
                this.root = this.root.right.minimumValue();
                return this.root;
            };
        };
    }

    levelOrder(callBackFunct = function(){return;}) {
        if (this.root === null) {
            return;
        }
        this.queue = [];
        this.queue.push(this.root);
        this.output = [];
        while (this.queue.length) {
            const node = this.queue.shift();
            if (node.left) {
                this.queue.push(node.left);
            };
            if (node.right) {
                this.queue.push(node.right);
            }
            this.output.push(node.data);
            callBackFunct(node.data);
        };
        return this.output;
    }

    // Visit the root.
    // Traverse the left subtree, i.e., call Preorder(left->subtree)
    // Traverse the right subtree, i.e., call Preorder(right->subtree) 
    preOrder(callBackFunct = function(){return;}) {
        if (this.root === null) {
            return;
        };
        this.output = [];
        this.output.push(this.root.data);
        callBackFunct(this.root.data);
        const leftSubtree = new Tree();
        leftSubtree.root = this.root.left;
        leftSubtree.preOrder(callBackFunct);
        const rightSubtree = new Tree();
        rightSubtree.root = this.root.right;
        rightSubtree.preOrder(callBackFunct);
        return this.output;
    }

    // Traverse the Left subtree
    // Visit the root
    // Traverse the right subtree
    inOrder(callBackFunct = function(){return;}) {
        if (this.root === null) {
            return;
        }
        this.output = [];
        const leftSubtree = new Tree();
        leftSubtree.root = this.root.left;
        leftSubtree.inOrder(callBackFunct);
        this.output.push(this.root.data);
        callBackFunct(this.root.data);
        const rightSubtree = new Tree();
        rightSubtree.root = this.root.right;
        rightSubtree.inOrder(callBackFunct);
        return this.output;
    }

    // Letf, Right, Read Data
    postOrder(callBackFunct = function(){return;}) {
        if (this.root === null) {
            return;
        }
        this.output = [];
        const leftSubtree = new Tree();
        leftSubtree.root = this.root.left;
        leftSubtree.postOrder(callBackFunct);
        const rightSubtree = new Tree();
        rightSubtree.root = this.root.right;
        rightSubtree.postOrder(callBackFunct);
        this.output.push(this.root.data);
        callBackFunct(this.root.data);
        return this.output;
    }

    // accepts a node and returns its depth. 
    // Depth is defined as the number of edges in path from a 
    // given node to the tree’s root node.
    depth(node, d = 0) {
        if (node.value === this.root.value) {
            return d;
        } else {
            if (node.value < this.root.value) {
                const newTree = new Tree();
                newTree.root = this.root.left;
                return newTree.depth(value, d+=1);
            };
            if (node.value > this.root.value) {
                const newTree = new Tree();
                newTree.root = this.root.right;
                return newTree.depth(value, d+=1);
            }; 
        };
    }
// isBalanced function which checks if the tree is balanced. 
// A balanced tree is one where the difference between heights 
// of left subtree and right subtree of every node is not more than 1. abs(leftsubtree - rightsubtree) <=1
    isBalanced() {
        if (Math.abs(height(this.root.left) - height(this.root.right)) <= 1) {
            return true;
        } else { return false;}
    }

// a rebalance function which rebalances an unbalanced tree. 
// Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
    rebalance() {
        this.root = buildTree(this.levelOrder());
        return this.root;
    };
}

//TO DO: accepts a node and returns its height. 
// Height is defined as the number of edges in longest path 
// from a given node to a leaf node.
function height(node) {
    if (node === null) {
        return 0;
    } else {
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    };
}

// Write a buildTree function which takes an array of data 
// (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and 
// turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). 
// The buildTree function should return the level-0 root node.
function buildTree(array, start = 0, end = 0) {
    // Step One remove duplicates
    const arrayNoDuplicates = [...new Set(array)];
    // Step Two sort array
    const sortedArray = mergeSort(arrayNoDuplicates);
    end = sortedArray.length-1;
    // Base Case
    if (start > end) {
        return null;
    }
    // get middle element and make it root
    const mid = Math.floor(start + end / 2);
    const node = new Node(sortedArray[mid]);
    // recursively construct left side
    node.left = buildTree(sortedArray.slice(0, mid), start, end);
    // recursively construct right side
    node.right = buildTree(sortedArray.slice(mid+1, array.length), start, end);
    return node;
}

// helper function used to sort an array
function mergeSort(list, sortedList = []) {
    if (list.length < 2) {
        return list;
    } else {
        let leftSide = mergeSort(list.slice(0, Math.floor(list.length / 2)));
        let rightSide = mergeSort(list.slice(Math.floor(list.length / 2)));
        for (i=0, j=0, k=0; i <= (leftSide.length + rightSide.length) - 1; i++) {
            if ((leftSide[j] < rightSide[k]) | (rightSide[k] === undefined)) {
                sortedList.push(leftSide[j]);
                j += 1;
            } else {
                sortedList.push(rightSide[k]);
                k += 1;
            }
        }
        return sortedList;        
    }
}

// helper function to console.log your tree in a structured format. 
// This function will expect to receive the root of your tree as the value for the node parameter.
function prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

// function to create a random array of numbers
function randomArray(numOfItems, maxVal) {
    const randomArray = [];
    for (i=0; i<numOfItems; i++) {
        randomArray.push(Math.floor(Math.random()* maxVal));
    };
    return randomArray;
}

// driver script
function runProgam() {
    const binaryTree = new Tree();
    let randomArray1 = randomArray(10, 20);
    console.log("Our Random Array is " + randomArray1);
    binaryTree.root = buildTree(randomArray1);
    console.log('Our balanced binary tree is:');
    prettyPrint(binaryTree.root);
    console.log("Is the tree balanced? " + binaryTree.isBalanced());
    console.log("Level Order: ");
    binaryTree.levelOrder(console.log);
    console.log("Pre Order: ");
    binaryTree.preOrder(console.log);
    console.log("Post Order: ");
    binaryTree.postOrder(console.log);
    console.log("In Order: ");
    binaryTree.inOrder(console.log);

    const node1 = new Node(101);
    const node2 = new Node(134);
    const node3 = new Node(192);
    node1.left = node2;
    node1.right = node3;
    node3.left = binaryTree.root;
    binaryTree.root = node1; 

    console.log('Our new unbalanced binary tree is:');
    prettyPrint(binaryTree.root);
    console.log("Is the tree balanced? " + binaryTree.isBalanced());
    console.log('Our rebalanced binary tree is:');
    binaryTree.rebalance();
    prettyPrint(binaryTree.root);
    console.log("Is the tree balanced? " + binaryTree.isBalanced());
    console.log("Level Order: ");
    binaryTree.levelOrder(console.log);
    console.log("Pre Order: ");
    binaryTree.preOrder(console.log);
    console.log("Post Order: ");
    binaryTree.postOrder(console.log);
    console.log("In Order: ");
    binaryTree.inOrder(console.log);

}