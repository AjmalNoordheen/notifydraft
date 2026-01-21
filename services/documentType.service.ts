import { DocumentType } from "@/models/DocumentType";

export const createDocumentType = async (data: any) => {
  return await DocumentType.create(data);
};

export const getAllDocumentTypes = async (page = 1, limit = 10, search = "") => {
  const skip = (page - 1) * limit;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  const [data, total] = await Promise.all([
    DocumentType.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    DocumentType.countDocuments(query)
  ]);
  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getDocumentTypeById = async (id: string) => {
  return await DocumentType.findById(id);
};

export const getDocumentTypeByName = async (name: string) => {
  return await DocumentType.findOne({ name });
}

export const updateDocumentType = async (id: string, data: any) => {

  if(data.name){
  const existsing = await DocumentType.findOne({ name: data.name , _id: { $ne: id } });
  if (existsing) {
    throw new Error("Document type with this name already exists");
  }
 }
  return await DocumentType.findByIdAndUpdate(id, data, { new: true });
}

export const deleteDocumentType = async (id: string) => {
  return await DocumentType.findByIdAndDelete(id);
};
