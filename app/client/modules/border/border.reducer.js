
const x1 = 80;
const x2 = 160;
const x3 = 240;

// const initialNodes = [
//   { id:1, x:x1, y:x2, color: 'white' },
//   { id:2, x:x2, y:x1, color: 'white' },
//   { id:3, x:x2, y:x2, color: 'white' },

//   { id:4, x:x3, y:x1, color: 'white' },
//   { id:5, x:x3, y:x2, color: 'white' },
//   { id:6, x:x3, y:x3, color: 'white' },
// ];

const initialNodes = [
  { id:1, x:x1, y:x2, color: 'red' },
  { id:2, x:x2, y:x1, color: 'white' },
  { id:3, x:x2, y:x2, color: 'white' },

  { id:4, x:x3, y:x1, color: 'white' },
  { id:5, x:x3, y:x2, color: 'white' },
  { id:6, x:x3, y:x3, color: 'white' },
];

const initialLinks = [
  { fr:1, to:2 },
  { fr:1, to:3 },
  { fr:2, to:3 },
  { fr:2, to:4 },
  { fr:3, to:4 },
  { fr:3, to:5 },
  { fr:3, to:6 },
  { fr:4, to:5 },
  { fr:5, to:6 },
];

const initialState = {
  nodes: initialNodes,
  links: initialLinks,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'BORDER_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'BORDER_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
