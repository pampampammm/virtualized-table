# Виртуализированная таблица

React 19 + TypeScript, [@tanstack/react-table](https://tanstack.com/table) + [@tanstack/react-virtual](https://tanstack.com/virtual).
100 000 строк `{ id, text }` лежат в памяти и передаются в таблицу одним массивом.

## Запуск

```bash
npm install
npm run dev
```

`npm run build` — сборка, `npm run typecheck` — проверка типов.

## Использование

```tsx
const itemsTable: TableConfig<Item> = {
    getRowId: (item) => String(item.id),
    columns: [
        {key: 'rowNumber', header: '№', width: 90, accessor: () => null, render: ({index}) => index + 1},
        {key: 'text', header: 'Текст'},
    ],
};

const table = useTanStackController(itemsTable, items);

<Table table={table}>
    <Table.Head/>
    <VirtualRows rowHeight={41} onRowClick={…} isRowSelected={…}/>
</Table>
```

## Структура

```
src/table/
  lib/     типы, хук-контроллер поверх react-table, утилиты
  ui/      Table, TableHead, TableRowView, Cell, VirtualRows
  index.ts публичный API
```

`useTanStackController` превращает описание колонок и данные в `ITableController`: `headers`, `rowCount`, `getRow(index)`. Компоненты работают только с этим контрактом, поэтому `@tanstack/react-table` не виден за пределами `lib/`.

Строки материализуются лениво: `getRow(index)` собирает ячейки по требованию, а не строит 100 000 строк заранее — иначе виртуализация экономила бы только DOM.

## Что можно сделать дальше: изоляция через DI

Сейчас реализация выбирается импортом: `App` берёт `useTanStackController` напрямую. Замена библиотеки — это новый хук с той же сигнатурой и правка одного импорта.

Полная изоляция выглядела бы так: контракт фабрики, отдающей и управление, и рендер, и внедрение её через контекст.

```ts
interface ITableFactory {
    useController<T>(config: TableConfig<T>, data: T[]): ITableController;
    readonly View: ITableView;
}
```

```tsx
<TableFactoryProvider factory={createTanStackFactory()}>
    <App/>
</TableFactoryProvider>
```

Что это даёт:

- реализация подставляется в одной точке (composition root), приложение видит только интерфейсы;
- разные таблицы в одном приложении могут работать на разных реализациях.
