import axios from "axios";

const API_URL =  "http://127.0.0.1:8000";
const DEFAULT_PAGE_SIZE = 10;

const normalizeStatus = (value) => {
    if (typeof value !== "string") return "";

    const status = value.trim().toLowerCase();

    if (status === "activo") return "Activo";
    if (status === "inactivo") return "Inactivo";
    if (status === "no activo") return "No activo";

    return status.charAt(0).toUpperCase() + status.slice(1);
};

const normalizeItem = (item, index) => ({
    key: `${item.item ?? index}-${item.resolucion ?? "registro"}`,
    item: item.item ?? index + 1,
    fecha_corte: item.fecha_corte ?? "",
    deportista: item.deportista ?? item.student ?? "",
    deporte: item.deporte ?? item.discipline ?? "",
    resolucion: item.resolucion ?? item.code ?? "",
    estado: normalizeStatus(item.estado ?? item.status ?? ""),
    fecha_registro: item.fecha_registro ?? "",
    observacion: item.observacion ?? null,
});

const buildPaginatedResponse = (items, page, limit) => {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Number(limit) || DEFAULT_PAGE_SIZE);
    const cantidad_total = items.length;
    const total_pages = Math.max(1, Math.ceil(cantidad_total / safeLimit));
    const current_page = Math.min(safePage, total_pages);
    const start = (current_page - 1) * safeLimit;

    return {
        data: items.slice(start, start + safeLimit),
        cantidad_total,
        pagina_actual: current_page,
        total_paginas: total_pages,
        limite: safeLimit,
    };
};

const normalizeFilter = (filter) => {
    if (!filter || filter === "todos") return "todos";

    const value = String(filter).trim().toLowerCase();

    if (value === "activo") return "activo";
    if (value === "inactivo" || value === "no activo") return "no activo";

    return value;
};

export const listaCandidato = async (page = 1, limit = DEFAULT_PAGE_SIZE, estadoFiltro = "todos") => {
    try {
        const response = await axios.get(`${API_URL}/candidato/lista`);
        const payload = response?.data;
        const filterValue = normalizeFilter(estadoFiltro);
        let items = [];

        if (payload && (payload.data || payload.cantidad_total)) {
            items = Array.isArray(payload.data) ? payload.data.map(normalizeItem) : [];
            if (filterValue !== "todos") {
                items = items.filter((item) => item.estado.trim().toLowerCase() === filterValue);
            }
            return buildPaginatedResponse(items, page, limit);
        }

        if (Array.isArray(payload)) {
            items = payload.map(normalizeItem);
            if (filterValue !== "todos") {
                items = items.filter((item) => item.estado.trim().toLowerCase() === filterValue);
            }
            return buildPaginatedResponse(items, page, limit);
        }

        return buildPaginatedResponse([], page, limit);
    } catch (error) {
        console.error("Error fetching candidatos:", error);
        throw error;
    }
};