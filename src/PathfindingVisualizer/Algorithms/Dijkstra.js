// Initialize all nodes with an infinite distance and a previousNode of null.
// Begin at the startNode, gradually explore the grid by visiting nodes with the smallest distance.
// Skip walls and terminate early if unreachable areas are detected.
// Update neighboring nodes' distances and keep track of their paths using previousNode.
// Once the finishNode is reached, backtrack from it to reconstruct the shortest path.

export function dijkstra(grid, startNode, finishNode){
  //array of all visited nodes
  const visitedNodes = [];
  //distance to reach startnode is 0
  startNode.distance = 0;
  //all other nodes in the list
  const unvisitedNodes = getAllNodes(grid);
  //while all the nodes are not visited
  while(unvisitedNodes.length){
      //as we need sorted distance we choose smallest distnce first
      //sort() converts elements to strings and sorts them lexicographically.
      //The comparator function defines how two elements, nodeA and nodeB, are compared.
      //The subtraction (nodeA.distance - nodeB.distance) determines their relative order
      unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

      //pick out the closest node
      const closestNode = unvisitedNodes.shift();
      //if encountered a wall, skip it
      if(closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if(closestNode.distance === Infinity) return visitedNodes;

      closestNode.isVisited = true;
      visitedNodes.push(closestNode);

      if(closestNode === finishNode) return visitedNodes;

      updateUnvisitedNeighbour(closestNode, grid);
  }
}

function getAllNodes(grid){
  const nodes = [];
  for(const row of grid){
      for(const node of row){
          nodes.push(node);
      }
  }
  return nodes;
}

function updateUnvisitedNeighbour(node, grid){
  const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for(const neighbour of unvisitedNeighbours){
      //update the distance of neighbours
      neighbour.distance = node.distance + 1;
      //to backtrack we need to have previous node 
      neighbour.previousNode = node;
  }
}

function getUnvisitedNeighbours(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  //all four directions left, right, top, bottom
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

//to get the shortest path
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodeInSortestPathOrder(finishNode){
  const nodeInSortestPathOrder = [];
  let currNode = finishNode;
  while(currNode != null){
      nodeInSortestPathOrder.unshift(currNode);
      currNode = currNode.previousNode;
  }
  return nodeInSortestPathOrder;
}