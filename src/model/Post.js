import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');

const PostSchema = new Schema({
	userName: { // Novo campo para armazenar o nome do usuário
    type: String,
    required: true
  },
	title: {
    type: String,
    required: true
  },
	content: {
    type: String,
    required: true
  },
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',    // referência ao model User
		required: true
	}
});

export default model('Post', PostSchema);