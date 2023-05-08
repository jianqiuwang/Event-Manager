class AddUniqueIndexToEvents < ActiveRecord::Migration[6.1]
  def change
    add_index :events, [:name, :start_time], unique: true
  end
end
