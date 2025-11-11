function status(request, response) {
  response.status(200).json({ status: "API Funcionando" });
}

export default status;
