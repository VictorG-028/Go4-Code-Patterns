package entidades;

import servico.IServicoEmailVisitante;

public class Escritorio extends Empresa {

    /*{Atributos e Código da classe Escritorio}*/

    @Override
    public void aceitarEnvio(IServicoEmailVisitante iServico){

    	iServico.EnviarEmailEscritorio(this);

    }


}
