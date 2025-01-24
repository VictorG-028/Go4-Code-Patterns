import entidades.*;
import servico.ServicoEmailVisitante;
import java.util.ArrayList;

public class Main {

	public static void main(String[] args) {

		System.out.println("teste");

		// new Cliente();

		ServicoEmailVisitante visitante = new ServicoEmailVisitante();

		ArrayList<Empresa> empresas = new ArrayList<>(3);
		empresas.add(new Academia());
		empresas.add(new Banco());
		empresas.add(new Escritorio());

        for (Empresa empresa : empresas) {

			// Antes do visitor
			if (empresa instanceof Academia) {
				//eviarEmailParaAcademia(empresa);
			} else if (empresa instanceof Banco) {
				//eviarEmailParaBanco(empresa);
			} else if (empresa instanceof  Escritorio) {
				//eviarEmailParaEscritorio(empresa);
			}

			// Depois do visitor
            empresa.aceitarEnvio(visitante);
        }
		
	}
	
}
