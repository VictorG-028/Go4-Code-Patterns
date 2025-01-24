package servico;

import entidades.Academia;
import entidades.Banco;
import entidades.Escritorio;

public class ServicoEmailVisitante implements IServicoEmailVisitante{

    /* Seguindo a lógica do padrão Visitor, essa classe é a implementação
    *  da interface Visitor.
    */

    @Override
    public void EnviarEmailAcademia(Academia a){
    
        //Código de envio de email para uma academia

    }

   @Override
    public void EnviarEmailBanco(Banco b){

        //Código de envio de email para um banco
        
    }

    @Override    
    public void EnviarEmailEscritorio(Escritorio e){
        
        //Código de envio de email para um escritório
        
    }
    
}
