export const setOffices = (data = []) => {
  return {
    type: "SET_OFFICES",
    offices: data.map((x: any) => ({
      id: x.id,
      name: x.name,
    })),
  };
};

export const setSectors = (data = []) => {
  return {
    type: "SET_SECTORS",
    sectors: data.map((s: any) => ({ value: parseInt(s.id), label: s.name })),
  };
};

export const setStatic = (data = []) => {
  return {
    type: "SET_STATIC_DATA",
    static: data,
  };
};
