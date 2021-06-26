/**
 *
 * Formulario
 * Interface for Forms Array
 *
 */
export interface Formulario {
  /**
   *
   * id
   * to use as a reference
   * for template
   * and functions
   *
   */
  id: number;
  /**
   *
   * formGroup_Title
   * to use as a reference
   * for template
   * and functions
   *
   */
  formGroup_Title: string;
  /**
   *
   * multi
   * Optional property
   * to use in checkbox inputs
   * if checked is allowed
   * multi or unique
   *
   */
  multi?: boolean;
  /**
   *
   * type
   * to use to check
   * type of input
   * iput - checkbox - array - date
   * for template
   * and functions
   *
   */
  type: string;
  /**
   *
   * formGroup_controls
   * formGroup properties
   * for rendering on
   * each filter
   *
   */
  formGroup_controls: Array<{
    for_label: string;
    formControl_Name: string;
    value: string;
  }>;
}
