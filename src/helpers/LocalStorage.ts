import { Projeto } from '../interface/project'

export const getProjects = (): Projeto[] => {
    const savedProjects = window.localStorage.getItem('projetos');
    return savedProjects ? JSON.parse(savedProjects) : [];
}

export const setProjects = (projetos: Projeto[]): void => {
    window.localStorage.setItem('projetos', JSON.stringify(projetos));
}

export default {
    getProjects,
    setProjects
}