import './Table.css';

interface TableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
  }[];
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export default function Table<T extends { id: number }>({
  data,
  columns,
  onDelete,
  onEdit,
}: TableProps<T>) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}>
                Aucune donnée
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {String(row[col.key])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="actions">
                    {onEdit && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onEdit(row.id)}
                      >
                        Éditer
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(row.id)}
                      >
                        Supprimer
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
