/* Forms Context */
import {
    EmployeeFormProvider,
    useEmployeeFormContext,
    useEmployeeForm,
} from "./form-context/useEmployeeForm";

import {
    DatesFormProvider,
    useDatesFormContext,
    useDatesForm,
} from "./form-context/useDatesForm";

import { useAuthStore } from "./auth/useAuthStore";

import { useMarcacionStore } from "./marcacion/useMarcacionStore";

import { useActividadStore } from "./actividad/useActividadStore";
import { useUiActividad } from "./actividad/useUiActividad";

import { useDateTime } from "./date/useDateTime";

import { useSoporteStore } from "./soporte/useSoporteStore";

import { useDepartamentoStore } from "./departamento/useDepartamentoStore";

import { useUsuarioStore } from "./usuario/useUsuarioStore";

import { useTipoPermisoStore } from "./permisos/useTipoPermisoStore";
import { useUiTipoPermiso } from "./permisos/useUiTipoPermiso";

import { useReportMarcacion } from "./reports/useReportMarcacion";

export {
    EmployeeFormProvider,
    useEmployeeFormContext,
    useEmployeeForm,

    DatesFormProvider,
    useDatesFormContext,
    useDatesForm,

    useAuthStore,
    useMarcacionStore,
    useActividadStore,
    useUiActividad,
    useDateTime,
    useSoporteStore,
    useDepartamentoStore,
    useUsuarioStore,
    useTipoPermisoStore,
    useUiTipoPermiso,

    useReportMarcacion
};
