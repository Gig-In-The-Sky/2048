The basic HTML and CSS are simple to understand.

For the JS, it has been split into the Model, View and Controller in the code itself. 
The idea was to send all the commands to manupulate the boxes from the controller. Then after the updates have occures, send this data to the view to change the HTML of that page.

The flow of the model is as follows
1. gLMove - Makes the move in the matrix according to the user input

  
2. glCounter - The purpose of this function is 2 fold. The first is to find the indexes in the matrix which have a zero so that the randomPositionGenerator has some target values
and we are not stuck in a random generation loop till we get the empty box by sheer chance. Instead of this, we will iterate through the matrix and already find the positions where there is a zero
and then return those indexes as an array. We will also return the length of the array so that we can use it in Math.random()*(length(zeroPositions)) to generate a random position
However, if we do no have any indexes with a 0 in them, then we will have to see if the game is in the end state of not.

3. glEnd - This is a function which checks if the game has ended or not. The idea is that if any element has an adjacent element as equal to it then the game can still continue and we are not in an end state.
   Otherwise we are in an end state.

4. gLPopulate - This will be fired when there are empty positions in the matrix (i.e., when glCounter does not reutrn an empty array). This will then randomly choose an index from the zeroPositions it gets from the gLcounter
function and randomly assign it a 2 or a 4.

5. gameLogic - This is the overall controller of the logic. This governs the flow of the logic.

