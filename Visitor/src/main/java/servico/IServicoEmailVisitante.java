package servico;

import entidades.Academia;
import entidades.Banco;
import entidades.Escritorio;

public interface IServicoEmailVisitante{

    // Seguindo a lógica do padrão Visitor, essa interaface é o próprio Visitor
    
    public void EnviarEmailAcademia(Academia a);
    public void EnviarEmailBanco(Banco b);
    public void EnviarEmailEscritorio(Escritorio e);
    
}