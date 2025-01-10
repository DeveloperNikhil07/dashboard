const {username,password}=process.env;

export const connectionStr="mongodb+srv://"+username+":"+password+"@cluster0.qhn8m.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0"