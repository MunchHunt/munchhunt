import React, { useState, useContext, useEffect } from "react";
import CreateTemplate from "./CreateTemplate";
import styles from "../../../styles/Home/Templates.module.css";
import { MunchContext } from '../../Contexts/MunchContext';

interface Props {
  selectedTemplate: string;
  setSelectedTemplate: Function;
}

const Templates: React.FC<Props> = ({ selectedTemplate, setSelectedTemplate }) => {
  const { isLoggedIn, setCoords, userTemplates, setCurrChoices } = useContext(MunchContext);
  const [active, setActive] = useState<string>('');

  const selectTemplate = (e: any, i: number): void => {
    e.preventDefault();
    const templateName = e.target.innerHTML;
    if (templateName === 'No template') {
      setSelectedTemplate('');
      setCurrChoices(['', '', '', '', '', '']);
      setCoords({ lat: '', long: '' });
      let template = document.getElementById(active);
      template?.classList.remove('activeTemplate');
    } else {
      let newChoices: any = userTemplates.filter(
        (each: any) => each.name === templateName
      );
      setCurrChoices(newChoices[0].choices);
      setCoords(newChoices[0].location);
      setSelectedTemplate(newChoices[0].name);

      if (selectedTemplate.length) {
        let prev = document.getElementById(active);
        prev?.classList.remove('activeTemplate');
      }
      setActive('template' + i.toString());
      let template = document.getElementById('template' + i.toString());
      template?.classList.add('activeTemplate');
      setSelectedTemplate(templateName);
    }
  };

  useEffect(() => {
    if (selectedTemplate === '') {
      for (let i = 0; i < userTemplates.length; i++) {
        let template = document.getElementById('template' + i.toString());
        template?.classList.remove('activeTemplate');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate])

  return (
    <div className={styles.innerContainer}>
      <h2>My Templates</h2>
      {isLoggedIn ? (
        <div className={styles.templateColumn}>
          {userTemplates.length ? (
            <>
              <div
                className={styles.template}
                onClick={(e: any) => selectTemplate(e, 1)}
                id='noTemplate'>
                No template
              </div>
              {userTemplates.map((temp: any, i: number) => (
                <div
                  key={temp.name}
                  className={styles.template}
                  onClick={(e: any) => selectTemplate(e, i)}
                  id={'template' + i.toString()}>
                  {temp.name}
                </div>
              ))}
            </>
          ) : (
            <div>No templates! Fill out the fields and create a new template below.</div>
          )}
          <CreateTemplate setSelectedTemplate={setSelectedTemplate} setActive={setActive} />
        </div>
      ) : (
        <div>
          <p>Login to create and use templates.</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
