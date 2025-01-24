package entidades;

import servico.IServicoEmailVisitante;

public class Banco extends Empresa{

    /*{Atributos e Código da classe Banco}*/

    @Override
    public void aceitarEnvio(IServicoEmailVisitante iServico){

        iServico.EnviarEmailBanco(this);

    }

}