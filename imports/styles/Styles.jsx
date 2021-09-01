import { makeStyles } from "@material-ui/styles";

const estilos = makeStyles({
  barra: {
    background: 'linear-gradient(45deg, #899cd0 30%, #7ef2b4 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  conteudo: {
    backgroundColor: '#3e3e3e',
    height: '100%'
  },
  botao: {
    backgroundColor: '#78a6d0 !important'
  },
  delete: {
    backgroundColor: '#ff8989 !important',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  }
});

export default estilos;