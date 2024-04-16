class Controller {
  constructor (entidateService) {
    this.entidateService = entidateService;
  }

  async pegaTodos(req, res) {
    try{
      const listaDeRegistro = await this.entidateService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (error) {
      //erro
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidateService.pegaUmPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch (error) {
      //erro
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidateService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (error) {
      //erro
    }
    
  }

  async atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const foiAtualizado = await this.entidateService.atualizaRegistro(dadosAtualizados, Number(id));
      if (!foiAtualizado) {
        return res.status(400).json({ mensagem: 'Registro não foi atualizado'});
      }
      return res.status(200).json({ mensagem: 'Atualizado com sucesso' });
    } catch (error) {
      //erro
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidateService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado`});
    } catch (error) {
      return res.status(500).json(error.mensage);
    }
  }
   
}

module.exports = Controller;