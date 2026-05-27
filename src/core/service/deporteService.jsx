import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const normalizeItem = (item, index) => ({
	id: `${item.nombre ?? "deporte"}-${index}`,
	nombre: item.nombre ?? "SIN NOMBRE",
	cantidad: Number(item.cantidad) || 0,
});

export const listaDeportes = async () => {
	try {
		const response = await axios.get(`${API_URL}/lista-deportes`);
		const payload = response?.data;

		if (payload && Array.isArray(payload.data)) {
			const data = payload.data
				.map((item, index) => normalizeItem(item, index))
				.sort((a, b) => b.cantidad - a.cantidad);

			return {
				data,
				total_personas: Number(payload.total_personas) || 0,
			};
		}

		if (Array.isArray(payload)) {
			const data = payload
				.map((item, index) => normalizeItem(item, index))
				.sort((a, b) => b.cantidad - a.cantidad);

			return {
				data,
				total_personas: data.reduce((acc, item) => acc + item.cantidad, 0),
			};
		}

		return { data: [], total_personas: 0 };
	} catch (error) {
		console.error("Error fetching deportes:", error);
		throw error;
	}
};


