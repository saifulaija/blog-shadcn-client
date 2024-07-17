import axios from 'axios';

export const uploadImage = async (file: File) => {
  console.log(file);
  const formData = new FormData();
  formData.append('image', file);
  // formData.append('key', '9afc585cc916e23b2756a9946d82ec0e');
  formData.append('key', '3e9f838fb2f36cc4b02367785db37014');
  const imageResponse = await axios.post(
    'https://api.imgbb.com/1/upload',
    formData,
  );
  return imageResponse.data.data.url;
};
