import { makeStyles } from "@material-ui/styles";

const estilos = makeStyles({
  barra: {
    background: 'linear-gradient(45deg, #5f967c 30%, #78a594 90%)',
    boxShadow: '0 3px 5px 2px #333333',
    color: 'white',
  },
  conteudo: {
    backgroundColor: '#3e3e3e',
    height: '100%'
  },
  card: {
    height: '100%',
    padding: '2%',
    marginTop: '48px',
    boxShadow: '6px 7px 4px -3px rgba(0,0,0,0.41)',
  },
  botao: {
    backgroundColor: '#bdf0da',
    color: 'white',
    transitionDuration: '0.2s',
    backgroundColor: '#638d80',
    paddingLeft: '18px',
    paddingRight: '18px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '12px',
    border: '2px solid transparent',
    marginRight:'25px',
    '&:hover': {
      color: '#a8f2da',
      transitionDuration: '0.2s',
      backgroundColor: '#424947',
    }
  },
  menu: {
    backgroundColor: '#2b2b2b !important',
    borderRadius: '50%',
    color: 'white',
    marginRight: '8px',
    width:'48px',
    height:'48px',
  },
  delete: {
    backgroundColor: '#ff8989 !important',
    margin: '4px',
    transitionDuration: '0.2s',
    '&:hover': {
      transitionDuration: '0.2s',
      backgroundColor: '#ff6464',
    }
  },
  edit: {
    backgroundColor: '#ffc246 !important',
    margin: '4px',
    transitionDuration: '0.2s',
    '&:hover': {
      transitionDuration: '0.2s',
      backgroundColor: '#ff6464',
    }
  },
  vizualize: {
    backgroundColor: '#8dcbf9 !important',
    margin: '4px',
    transitionDuration: '0.2s',
    '&:hover': {
      transitionDuration: '0.2s',
      backgroundColor: '#ff6464',
    }
  },
  textfield: {
    marginTop: '25px',
    width:'90%'
  },
  checkboxfield: {
    marginTop: '16px',
    width:'80%'
  },
  buttonCadastro: {
    marginTop: '48px',
    marginLeft: '8px',
    marginRight: '8px',
  },
  signLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2em',
    transitionDuration: '0.2s',
    backgroundColor: '#638d80',
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid transparent',
    '&:hover': {
      color: 'white',
      transitionDuration: '0.2s',
      backgroundColor: 'transparent',
      border: '2px solid #638d80',
    }
  },
  profile: {
    border: '1px solid #ddd',
    borderRadius: '50%',
    height:'110px',
    width:'110px',
    padding: '5px',
    marginTop:'24px',
    objectFit:'cover'
  },
  loginButton: {
    backgroundColor: '#bdf0da',
    color: 'white',
    transitionDuration: '0.2s',
    backgroundColor: '#638d80',
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid transparent',
    '&:hover': {
      color: '#a8f2da',
      transitionDuration: '0.2s',
      backgroundColor: '#424947',
    }
  }



});

export default estilos;