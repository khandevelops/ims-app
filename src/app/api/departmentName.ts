const baseUrl = process.env.REACT_APP_BASE_URL;

export const createDepartmentName = (params: { name: string, key: string }) => {
    return axios.post(`${baseUrl}/profile-details/department-names/create`, params);
};

export const getDepartmentNames = () => {
    return axios.get(`${baseUrl}/profile-details/department-names/list`);
};
