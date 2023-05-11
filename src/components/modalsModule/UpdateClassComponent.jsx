import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import FileUploader from "../FileComponent";
import DragDropFile from "../MultimediaComponent";
import { ExternalLinkComponent } from "../ExternalLinkComponent";
import InputArticleComponent from "../InputArticleComponent";
import PropTypes from "prop-types";
// Import models
import { TYPES } from "../../models/types.enum";
import { Classes } from "../../models/classes.class";

const UpdateClassComponent = ({ clase1 }) => {
  const {
    _id,
    name,
    type,
    description,
    duration,
    url,
    image,
    video,
    audio,
    article,
    document,
    position,
  } = clase1;

  const [componentToRender, setComponentToRender] = useState("");
  const [articleState, setArticleState] = useState("");
  const [classType, setClassType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      description: description,
      duration: duration,
      url: url,
    },
  });

  const addArticle = (newArticle) => {
    setArticleState(newArticle);
  };

  const changeChoice = (choice) => {
    switch (choice.value) {
      case "1":
        setComponentToRender(<FileUploader />);
        setClassType(TYPES.DOCUMENT);
        break;
      case "2":
        setComponentToRender(<DragDropFile />);
        setClassType(TYPES.MULTIMEDIA);
        break;
      case "3":
        setComponentToRender(<ExternalLinkComponent {...register("url")} />);
        setClassType(TYPES.LINK);
        break;
      case "4":
        setComponentToRender(<InputArticleComponent addArticle={addArticle} />);
        setClassType(TYPES.ARTICLE);
        break;
      default:
        setComponentToRender("");
    }
  };

  const sendData = (data) => {
    // Pass the data to the new construct
    const updateClass = new Classes(
      data.name,
      classType,
      data.description,
      data.duration,
      data.url,
      data.image,
      data.video,
      data.audio,
      articleState,
      data.document,
      position
    );
    console.log(data);
    console.log(updateClass);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#editarModulo${_id}`}
      >
        <AiOutlineEdit />
      </button>

      <div
        className="modal fade"
        id={`editarModulo${_id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="staticBackdropLabel">
                Editar Clase: {name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Body */}
            <div className="modal-body text-start">
              <form onSubmit={handleSubmit(sendData)}>
                <div className="row mt-3">
                  <div className="col">
                    <label className="form-label">Tipo de Clase</label>
                    <select
                      className="form-select"
                      onChange={(choice) => changeChoice(choice.target)}
                    >
                      <option>Seleccione el tipo de clase</option>
                      <option value="1">Documento</option>
                      <option value="2">Multimedia</option>
                      <option value="3">Enlace externo</option>
                      <option value="4">Articulo</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control z-depth-1"
                        placeholder="Escribe el nombre de la clase..."
                        {...register("name", {
                          required: "El nombre de la clase es requerida",
                          minLength: {
                            value: 1,
                            message: "la longitud mínima es 1",
                          },
                        })}
                      />
                      {errors.name && (
                        <div className="alert alert-danger" role="alert">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <div className="form-group shadow-textarea">
                      <label htmlFor="description" className="form-label">
                        Descripción
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        className="form-control z-depth-1"
                        placeholder="Escribe la descripción de la clase..."
                        {...register("description", {
                          required: "la descripción de la clase es requerida",
                          minLength: {
                            value: 5,
                            message: "la longitud mínima es 5",
                          },
                        })}
                      />
                      {errors.description && (
                        <div className="alert alert-danger" role="alert">
                          {errors.description.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="time" className="form-label">
                        Duración
                      </label>
                      <input
                        type="text"
                        id="time"
                        className="form-control z-depth-1"
                        placeholder="La duración de la clase va aquí..."
                        {...register("duration", {
                          required: "la duración de la clase es requerida",
                          minLength: {
                            value: 1,
                            message: "la longitud mínima es 1",
                          },
                        })}
                      />
                      {errors.time && (
                        <div className="alert alert-danger" role="alert">
                          {errors.time.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center mt-3">
                  <div className="col">
                    {/* Print Component to render */}
                    {componentToRender != "" && componentToRender}
                  </div>
                </div>
                {/* Modal Footer */}
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Aceptar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UpdateClassComponent.propTypes = {
  clase1: PropTypes.object.isRequired,
};

export default UpdateClassComponent;
