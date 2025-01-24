package entidades;
import servico.IServicoEmailVisitante;

public class Academia extends Empresa {
    
    /*{Atributos e Código da classe Academia}*/

	@Override
    public void aceitarEnvio(IServicoEmailVisitante iServico){

        iServico.EnviarEmailAcademia(this);
        
    }

	
}
