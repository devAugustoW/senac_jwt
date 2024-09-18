import Post from '../model/Post';
import User from '../model/User';

class PostController {
  // cria post
  async store(req, res) {
		console.log("Entrou no método store");

		const { title, content } = req.body;
		const userId = req.userId; // Middleware de autenticação injetando o ID do usuário autenticado

		console.log("Dados recebidos no body:", req.body); // Verifica o conteúdo recebido
    console.log("ID do usuário autenticado:", userId);

    try {
			// Verifica se o usuário existe
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado.' });
			}

			// Cria o post
			const post = await Post.create({
				userName: user.name,
				title,
				content,
				user: userId 
			});

      return res.status(201).json(post);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar o post.' });

    }
  }

  // lista todos os posts 
  async getPosts(req, res) {
		console.log('cheguei aqui')

    try {
      // Busca todos os posts
      const posts = await Post.find().populate('user', 'name'); // Popula o campo `user` com o nome do usuário

      return res.status(200).json(posts);
    } catch (error) {
      console.error("Erro ao listar posts:", error.message);
      return res.status(500).json({ error: 'Erro ao listar posts.' });
    }
  }

	// edita um post específico pelo ID da postagem
	async updatePost(req, res) {
    const { title, content } = req.body;
    const { id } = req.params; // ID do post a ser atualizado
    const userId = req.userId; // ID do usuário autenticado

    console.log('ID do post:', id);
    console.log('ID do usuário autenticado:', userId);

    try {
			// Encontra o post pelo ID
			const post = await Post.findById(id);
			if (!post) {
				return res.status(404).json({ error: 'Post não encontrado.' });
			}

			// Verifica se o usuário autenticado é o dono do post
			if (post.user.toString() !== userId.toString()) {
				return res.status(403).json({ error: 'Você não tem permissão para atualizar este post.' });
			}

			// Atualiza o post com os novos dados
			post.title = title || post.title;
			post.content = content || post.content;
			await post.save();

			return res.status(200).json(post);

    } catch (error) {
			console.error("Erro ao atualizar o post:", error.message);
			return res.status(500).json({ error: 'Erro ao atualizar o post.' });
    }
}
}

export default new PostController();