import { makeStyles } from "@material-ui/styles";

const estilos = makeStyles({
  barra: {
    background: 'linear-gradient(45deg, #899cd0 30%, #7ef2b4 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  conteudo: {
    backgroundColor: '#3e3e3e',
    height: '100%',
  },
  card: {
    height: '100%',
    padding: '2%',
    marginTop:'33%'
  },
  botao: {
    backgroundColor: '#78a6d0 !important',
    marginRight:'8px'
  },
  menu: {
    backgroundColor: '#2b2b2b !important',
    borderRadius:'50%',
    color: 'white',
    marginRight:'8px'
  },
  delete: {
    backgroundColor: '#ff8989 !important',
    margin:'4px',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  },
  edit: {
    backgroundColor: '#ffc246 !important',
    margin:'4px',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  },
  vizualize: {
    backgroundColor: '#8dcbf9 !important',
    margin:'4px',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  },
  login:{
    
  },
  textfield:{
    marginTop:'16px',
  },
  buttonCadastro:{
    marginTop:'16px',
    marginLeft:'4px',
    marginRight:'4px',
  }

});

export default estilos;