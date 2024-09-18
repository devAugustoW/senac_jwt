import bcrypt from 'bcrypt';
import User from "../model/User";

class UserController{

	// cria usuário
	async store(req, res){
		// receber os dados da requisição
		const { name, email, password } = req.body;

		  // verificação para não criar o mesmo usuário duas vezes
      let user = await User.findOne({ email });
      if(user){
				return res.status(400).json({ error: 'Usuário já cadastrado.' });

      } else{				

				// Criptografa a senha
				const hashedPassword  = await bcrypt.hash(password, 8);

				// cria o usuário
				user = await User.create({ 
					name,
					email, 
					password_hash: hashedPassword
				});
			}
		return res.json(user);
	}

	// resgata todos os usuários
	async getUsers(req, res) {
    try {
      const users = await User.find(); 
			return res.status(200).json(users)

    } catch (err) {
			return res.status(500).json({ error: 'Erro ao buscar usuários.' });
			
    }
  }

	// atualiza o email do usuário pelo ID
	async updateUser(req, res) {
		try {
			const { name, email } = req.body; 
      const userId = req.params.id;

			// procura o usuário pelo ID
			const user = await User.findById(userId);

			// astualiza apenas os campos especificados
			if (name) user.name = name;
			if (email) user.email = email;
			
			// salva as alterações no banco de dados
			await user.save();

			return res.status(200).json({ message: 'Usuário atualizado com sucesso.', user });

		} catch (error) {
			return res.status(500).json({ error: 'Falha ao atualizar o email do usuário.' });

		}
	}

	// deleta um usuário pelo ID
	async delete(req, res) {
		try {
			const userId = req.params.id; 
				
			// Procura o usuário pelo ID
			const user = await User.findById(userId);
			
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado.' });
			}
	
			// Remove o usuário do banco de dados
			await User.deleteOne({ _id: userId });
		
			return res.status(200).json({ message: 'Usuário removido com sucesso.' });

		} catch (error) {
			return res.status(500).json({ error: 'Falha ao remover o usuário.' });
			
		}
	}
}
export default new UserController();